import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { helpCategories } from "../constants/categories";
import TasksFeed from "../components/TasksFeed";
import { dummyTasks } from "../constants/dummy-data";

function HomePage() {
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
    <div>
      <div className="w-full max-w-7xl mt-0 md:mt-10">
        <div className="flex justify-between">
          <p className="text-2xl font-bold mx-2 mb-4">How could you help?</p>
        </div>
        <ToggleGroup
          type="multiple"
          className="w-max flex flex-wrap max-w-full justify-start gap-1.5"
        >
          {Object.keys(helpCategories).map((k) => (
            <ToggleGroupItem
              variant="outline"
              className="hover:bg-blue-50 text-xs"
              value={k}
              size="xs"
              id={k}
            >
              {helpCategories[k as TaskCategory]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {/* <SelectionTabs
            selections={taskCategories}
            currentSelections={filters.category}
            selectionTranslations={taskCategoriesDictionary}
            setSelections={(selections) =>
              setFilters((fs) => ({
                ...fs,
                category: selections as TaskCategory[],
              }))
            }
          />
          <p className="text-2xl font-bold mx-2 mb-4 mt-8">באיזה איזור?</p>
          <SelectionTabs
            selections={districts}
            currentSelections={filters.district ? [filters.district] : []}
            selectionTranslations={districtsDictionary}
            setSelections={(selections) =>
              setFilters((fs) => ({
                ...fs,
                district: selections[0] as District,
              }))
            }
            multiple={false}
          /> */}
        <div className="mt-8">
          {dummyTasks.length ? (
            <TasksFeed
              tasks={dummyTasks.filter((t) => t.status !== "completed")}
            />
          ) : (
            <p className="text-2xl font-bold mt-4">Please expand your search</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
