import { useFeed } from "replyke";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { helpCategories } from "../constants/categories";
import TasksFeed from "../components/TasksFeed";

function HomePage() {
  const { entities, createEntity } = useFeed();

  console.log({ entities, createEntity });
  // const handleScroll = useCallback(async () => {
  //   try {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       if (!lastVisible) {
  //         throw new Error("Last visible wasn't set");
  //       }
  //       const newDocs = await fetchMoreDocuments(lastVisible);
  //       if (!newDocs) {
  //         throw new Error("Fetching new docs failed");
  //       }
  //       setTasks((ts) => (ts ? [...ts, ...newDocs] : ts));
  //       setLastVisible(newDocs[newDocs.length - 1]);
  //     }
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.log("Failed to fetch more documents", err.message);
  //     } else {
  //       console.log("Failed to fetch more documents", err);
  //     }
  //   }
  // }, [lastVisible, fetchMoreDocuments]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [tasks, lastVisible, handleScroll]);

  return (
    <div className="w-full max-w-7xl grid gap-4">
      <h1 className="text-2xl font-bold mx-2 mb-4">How could you help?</h1>

      <ToggleGroup
        type="multiple"
        className="w-full flex flex-wrap justify-start gap-1.5"
      >
        {Object.keys(helpCategories).map((k) => (
          <ToggleGroupItem
            variant="outline"
            className="hover:bg-blue-50 text-xs"
            value={k}
            size="xs"
            id={k}
            key={k}
          >
            {helpCategories[k as TaskCategory]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {entities?.length ? (
        <TasksFeed
          tasks={(entities as unknown as Task[]).filter(
            (t) => t.metadata.status !== "completed"
          )}
        />
      ) : (
        <p className="text-2xl font-bold mt-4">Please expand your search</p>
      )}
    </div>
  );
}

export default HomePage;
