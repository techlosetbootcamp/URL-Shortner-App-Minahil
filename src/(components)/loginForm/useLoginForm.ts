"use client"

import React, { useEffect, useState } from "react";

const useLoginForm = ():[string,React.Dispatch<React.SetStateAction<string>>,string,React.Dispatch<React.SetStateAction<string>>,boolean,() => Promise<void>] => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async()=>{

  }
  return [email, setEmail, password, setPassword, loading,login];
};
export default useLoginForm;
