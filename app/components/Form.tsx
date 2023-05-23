import Link from 'next/link';

export default function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="text-left">
        <span className="">Post</span>
      </h1>
      <p className="text-left max-w-md">
        {type} and share amazing ideas with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form action="" onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7">
        <label htmlFor="">
          <span className="font-semibold text-base text-gray-700">
            Your idea Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value })}
            placeholder="Write your idea here..."
            required
            className=""
          />
        </label>
        <label htmlFor="">
          <span className="font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">( #product, #webDevelopment, #idea)</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className=""
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="px-5 py-1.5 text-sm rounded-full text-white">
            {submitting ? `${type}...` : type }
          </button>
        </div>
      </form>
    </section>
  )
}
