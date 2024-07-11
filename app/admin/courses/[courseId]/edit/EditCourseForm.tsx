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
import { edtiCourseAction } from "./edit-course.action";
import { EditCourseSchema } from "./edit-course.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export type EditCourseFormProps = {
  defaultValues?: EditCourseSchema & {
    id: string;
  };
};

export const EditCourseForm = ({ defaultValues }: EditCourseFormProps) => {
  const form = useZodForm({
    schema: EditCourseSchema,
    defaultValues: defaultValues,
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: EditCourseSchema) => {
      const result: EditCourseSchema = {
        ...data,
      };

      try {
        if (!defaultValues?.id) {
          throw new Error("No course found");
        }
        await edtiCourseAction({
          courseId: defaultValues.id,
          data: result,
        });
        toast.success("Course updated successfully");
        router.push(`/admin/courses/${defaultValues?.id}`);
        router.refresh();
        return;
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
          onSubmit={async (values) => {
            if (defaultValues?.id) {
              mutation.mutate(values);
            }
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
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                  <Textarea placeholder="..." {...field} />
                </FormControl>
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
