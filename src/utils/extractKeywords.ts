


export const extractKeywords = async (message: string) => {
    const res = await fetch("/api/extract-keywords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.keywords as string[];
  };