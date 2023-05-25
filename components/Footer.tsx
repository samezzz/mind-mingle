"use client";

import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function Footer() {
  const { domain = "localhost:3000" } = useParams() as { domain: string };

  return (
    <div className="z-10 flex h-20 items-center justify-center space-x-12 border-t border-gray-200">
      <a href="https://twitter.com/samezzz" target="_blank" rel="noreferrer">
        <span className="sr-only">Twitter</span>
        <FaTwitter className="h-6 w-6 text-gray-600" />
      </a>
      <Link
        href={
          domain === "dub.sh"
            ? "/"
            : `https://localhost:3000?utm_source=${domain}&utm_medium=referral&utm_campaign=custom-domain`
        }
      >
        <span className="sr-only">Dub.sh Logo</span>
      </Link>
      <a
        href="https://github.com/samezzz"
        target="_blank"
        rel="noreferrer"
      >
        <span className="sr-only">Github</span>
        <FaGithub className="h-6 w-6 text-gray-600" />
      </a>
    </div>
  );
}
