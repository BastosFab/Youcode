"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogOut, User2 } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export type LoggedInButtonProps = {
  user: Session["user"];
};

export const LoggedInButton = (props: LoggedInButtonProps) => {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut();
    },
  });
  return (
    <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"} className="gap-2">
            <Avatar className="size-6">
              <AvatarFallback>{props.user.name?.[0]}</AvatarFallback>
              {props.user.image && (
                <AvatarImage
                  src={props.user.image}
                  alt={props.user.name ?? "user picture"}
                />
              )}
            </Avatar>
            {props.user.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <Link href={"/account"} className="flex items-center">
              <User2 className="mr-2" size={12} />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              {mutation.isPending ? (
                <Loader className="mr-2" size={12} />
              ) : (
                <LogOut className="mr-2" size={12} />
              )}{" "}
              Logout
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Voulez vous vous déconnecter ?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant={"secondary"}>Retour</Button>
            </AlertDialogCancel>
            <Button
              variant={"destructive"}
              onClick={() => {
                mutation.mutate();
              }}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader className="mr-2" size={12} />
              ) : (
                <LogOut className="mr-2" size={12} />
              )}{" "}
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};
