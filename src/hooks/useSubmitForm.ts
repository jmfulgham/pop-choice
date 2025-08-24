export const useSubmitForm = async (stuff)=> {
   console.log("clicked")

    const response=  await fetch("/api", {
        method: "POST",
        body: JSON.stringify(stuff)
    });

   console.log(response);
}
