export const useSubmitForm = async (stuff)=> {
    const response=  await fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stuff)
    });
   return await response.json();
}
