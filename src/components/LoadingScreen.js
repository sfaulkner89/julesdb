import React from "react";

export default function LoadingScreen({
  remaining,
  totalFiles,
  dark,
  darkColor,
  lightColor,
  status,
}) {
  return (
    <div>
      <h1>
        Files Remaining:
        {remaining}/{totalFiles}
      </h1>
      <h2>{status}</h2>
      <div className="lds-hourglass" />
    </div>
  );
}
