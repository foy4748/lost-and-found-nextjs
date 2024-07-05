"use client";
import { Button, Label, TextInput } from "flowbite-react";
function ChangePasswordForm() {
  return (
    <form className="flex max-w-md flex-col gap-4">
      <h1 className="form-title mb-4">Update Password</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="oldpassword" value="Old Password" />
        </div>
        <TextInput id="oldpassword" type="password" sizing="md" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="newpassword" value="New Password" />
        </div>
        <TextInput id="newpassword" type="password" sizing="md" required />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default ChangePasswordForm;
