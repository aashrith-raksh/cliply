import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchUrl = () => {
  return (
    <section className="mb-8">
      <h1 className="text-4xl font-bold mb-4">My Links</h1>
      <div className="flex gap-4">
        <Input
          className="max-w-10/12 placeholder:text-sm"
          placeholder="Search for you url..."
        />
        <Button className="grow" variant={"outline"}>
          Filter
        </Button>
        <Button className="grow">Create Link</Button>
      </div>
    </section>
  );
};

export default SearchUrl;
