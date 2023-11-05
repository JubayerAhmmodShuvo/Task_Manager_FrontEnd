export const getBaseUrl = ():string => {
  
  return (
    process.env.NEXT_PUBLIC_API_BASEURL ||
    "https://taskmanager-backend-beige.vercel.app/ "
  );
}