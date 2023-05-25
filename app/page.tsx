import Feed from "../components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Generate and share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Ideas to everyone</span>
      </h1>
      <p className="desc text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, maiores doloribus iusto cumque modi harum illo, excepturi, aliquam odit corrupti blanditiis.
      </p>

      {/* <Feed /> */}
    </section>
  )
}
