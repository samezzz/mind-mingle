import PromptCard from './PromptCard'

export default function Profile({ name, desc, data, handleEdit, handleDelete }) {
  return (
    <section className="w-full">
      <h1 className="text-left">
        <span className="">{name} Profile</span>
      </h1>
      <p className="text-left">
        {desc}
      </p>

      <div className="mt-10">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}
