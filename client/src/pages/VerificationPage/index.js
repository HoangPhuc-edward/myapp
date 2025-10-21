import React from "react";

export default function VerificationPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get("type") || "normal"; // 'normal' or 'success'

  return (
    <div>
      <h1>Verification Page</h1>
      {type === "normal" && (
        <div>
          <p>Please verify your email address.</p>
        </div>
      )}
      {type === "success" && <p>Your email has been verified successfully!</p>}
    </div>
  );
}
