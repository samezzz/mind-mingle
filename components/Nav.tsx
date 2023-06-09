'use client';

import Link from 'next/link'
import { TbLetterM, TbCircleLetterM } from 'react-icons/tb'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

export default function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <TbLetterM className="w-8 h-8 m-0 p-0 " />
        <TbCircleLetterM className="w-6 h-6 -ml-[7px]" />
        <p>Mind Mingle</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-idea" className="black_btn">
                Create Idea
              </Link>

              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>

              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
                {
                  providers && Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className=""
                    >
                      Sign In
                    </button>
                  ))
              }
            </>
          )
        }
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className='flex'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropdown(prev => !prev)}
              />

              {
                toggleDropdown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-idea"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Idea
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut()
                      }}
                      className="mt-5 w-full"
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
              <>
                {
                  providers && Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  ))
                }
              </>
          )
        }
      </div>
      
    </nav>
  )
}
