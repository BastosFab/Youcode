"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CourseSchema, CourseSchemaType } from "./course.schema";
import { courseActionEdit, courseActionCreate } from "./course.action";

export type EditCourseFormProps = {
  defaultValues?: CourseSchemaType & {
    id: string;
  };
};

export const CourseForm = ({ defaultValues }: EditCourseFormProps) => {
  const form = useZodForm({
    schema: CourseSchema,
    defaultValues: defaultValues,
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: CourseSchemaType) => {
      const fixedData: CourseSchemaType = {
        ...data,
      };

      try {
        const { data, serverError } = defaultValues?.id
          ? await courseActionEdit({
              courseId: defaultValues.id,
              data: fixedData,
            })
          : await courseActionCreate(fixedData);

        if (data) {
          toast.success(data.message);
          router.push(`/admin/courses/${data.course.id}`);
          router.refresh();
          return;
        } else {
          toast.error("Some error happened", {
            description: serverError,
          });
        }
      } catch {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Card>
      <CardContent className="mt-6">
        <Form
          form={form}
          className="flex flex-col gap-4"
          onSubmit={async (values) => {
            mutation.mutate(values);
          }}
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="https://image-url.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Course name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="presentation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presentation</FormLabel>
                <FormControl>
                  <Textarea placeholder="## Some markdown" {...field} />
                </FormControl>
                <FormDescription>Markdown is supported.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-6" type="submit" disabled={mutation.isPending}>
            Submit
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
