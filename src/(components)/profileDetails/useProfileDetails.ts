const useProfileDetails=()=>{

  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    const names = name.split(" ");
    return names
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();
  };
  return {getInitials};
};
export default useProfileDetails;