import Tab from "./Tab";

function Tabs({
  tabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: {
    title: string;
    icon: JSX.Element;
    disabled?: boolean;
    index?: string;
  }[];
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="border-b border-gray-200">
      <ul className="flex text-sm font-medium text-center text-gray-500">
        {tabs.map((tab, i) => {
          const tabIndex = tab.index ? Number(tab.index) : i;
          return (
            <Tab
              title={tab.title}
              icon={tab.icon}
              isSelected={currentTab === tabIndex}
              onClick={() => {
                setCurrentTab(tabIndex);
              }}
              disabled={tab.disabled}
              key={tab.title + i}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Tabs;
