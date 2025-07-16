import Links from "@/components/dashboard/Links";
import SearchUrl from "@/components/dashboard/SearchUrl";
import Stats from "@/components/dashboard/Stats";
import Section from "@/components/Section";

const Dashboard = () => {
  return (
    <Section>
      <Stats/>
      <SearchUrl/>
      <Links/>
    </Section>
  );
};

export default Dashboard;
