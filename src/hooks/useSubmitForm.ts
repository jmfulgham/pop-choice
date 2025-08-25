export const useSubmitForm = async (stuff)=> {
   console.log("clicked", stuff)

    const response=  await fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stuff)
    });

   console.log(await response.json());
}
