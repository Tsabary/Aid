import { useState } from "react";
import { Header } from "../components/Header";

function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lastVisible, setLastVisible] = useState<Task | null>(null);
  const [filters, setFilters] = useState<{
    category: TaskCategory[];
  }>({ category: [] });

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
    <div dir="rtl">
      <Header dark />
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-7xl mt-0 md:mt-10">
          <p className="text-2xl font-bold mx-2 mb-4">במה תוכלו לעזור?</p>
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
          {/* <div className="mt-8">
            {tasks.length ? (
              <TasksFeed
                tasks={tasks.filter((t) => t.status !== "completed")}
              />
            ) : (
              <p className="text-2xl font-bold mt-4">
                לא מצאנו יוזמות פעילות שעונות לסינונים שלך
              </p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
