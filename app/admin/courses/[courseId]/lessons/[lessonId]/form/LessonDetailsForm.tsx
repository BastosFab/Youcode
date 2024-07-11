"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { lessonActionEditDetails } from "../lesson.action";
import {
  LESSON_STATES,
  LessonDetailsSchema,
  LessonDetailsSchemaType,
} from "./lesson.schema";

export type LessonDetailsFormProps = {
  defaultValues: LessonDetailsSchemaType & {
    id: string;
  };
};

export const LessonDetailsForm = ({
  defaultValues,
}: LessonDetailsFormProps) => {
  const form = useZodForm({
    schema: LessonDetailsSchema,
    defaultValues: defaultValues,
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: LessonDetailsSchemaType) => {
      const fixedData: LessonDetailsSchemaType = {
        ...data,
      };

      try {
        const { data, serverError } = await lessonActionEditDetails({
          lessonId: defaultValues.id,
          data: fixedData,
        });

        if (data) {
          toast.success(data.message);
          router.push(
            `/admin/courses/${data.lesson.courseId}/lessons/${data.lesson.id}`
          );
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
    <Form
      form={form}
      className="flex flex-col gap-4"
      onSubmit={async (values) => {
        mutation.mutate(values);
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Lesson name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {LESSON_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className="mt-6" type="submit" disabled={mutation.isPending}>
        Submit
      </Button>
    </Form>
  );
};
