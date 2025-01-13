import { useEffect } from "react";

const WelcomePage = () => {
  // Content variables
  const title = "Welcome";
  const description = "Together, We Can Make a Difference";
  const content = (
    <div className="grid gap-4">
      <p>
        In the wake of the recent fires, our community has come together to
        support those in need. This platform exists to bridge the gap between
        those seeking help and those eager to provide it. Whether you’re looking
        for assistance or ready to lend a hand, this tool is here to connect
        you.
      </p>
      <p>
        If you need help, this site allows you to share your request with the
        community. You can describe what you need, where you are, and the kind
        of support that would make the biggest difference—whether it’s housing,
        food, medical care, or something else. By doing so, you make it easy for
        volunteers nearby to step up and assist. All we ask is that you include
        your name and a way for others to contact you so help can find you
        quickly.
      </p>
      <p>
        For those looking to help, this site makes it easy to find requests that
        match your skills, resources, or location. Simply search for needs close
        to you and filter by the kind of support you’re best equipped to
        provide. From there, you can connect directly with those in need and
        make an impact where it matters most.
      </p>
      <p>
        This tool is about coming together as neighbors and rebuilding stronger,
        one act of kindness at a time. Thank you for joining this effort. Let’s
        make a difference—together.
      </p>
    </div>
  );

  useEffect(() => {
    localStorage.setItem("welcome-viewed", "true");
  }, []);

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <h2 className="text-xl text-gray-700">{description}</h2>
      </header>
      <main className="prose max-w-none">{content}</main>
    </div>
  );
};

export default WelcomePage;
