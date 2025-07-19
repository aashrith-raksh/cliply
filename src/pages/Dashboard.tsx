import LinksList from "@/components/dashboard/LinksList";
import SearchUrl from "@/components/dashboard/SearchUrl";
import Stats from "@/components/dashboard/Stats";
import Section from "@/components/Section";

const Dashboard = () => {
  return (
    <Section>
      <Stats/>
      <SearchUrl/>
      <LinksList/>
    </Section>
  );
};

export default Dashboard;
