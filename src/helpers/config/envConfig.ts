export const getBaseUrl = ():string => {
  
  return (
    process.env.NEXT_PUBLIC_API_BASEURL ||
    "http:/loaclhost:30001/api/v1"
  );
}