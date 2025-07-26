import { XCircle } from "lucide-react";
import React from "react";

type Props = {
  textError: string;
};

const ValidationList = ({ textError }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <XCircle className="w-4 h-4 text-red-500" />
      {textError}
    </div>
  );
};

export default ValidationList;
