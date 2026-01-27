"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
	signOut({ callbackUrl: "/auth/signin" });
	return <div>SignOut</div>;
};

export default SignOut;
