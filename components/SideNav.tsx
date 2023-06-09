import React, { useEffect, useState } from "react";
import { MdDashboard, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BsImage, BsMegaphone } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { BiMessageDetail } from "react-icons/bi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { auth } from "../config/firebase";
import { usePathname, useRouter } from "next/navigation";
import { setUser } from "../store/userSlice";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";

interface SideNavProps {
  openNav?: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: <MdDashboard color="#fff" size={25} />,
    route: "/dashboard",
  },
  {
    id: 2,
    label: "Account",
    icon: <AiOutlineUser color="#fff" size={25} />,
    route: "/account",
  },
  {
    id: 4,
    label: "Gallery",
    icon: <BsImage color="#fff" size={25} />,
    route: "/gallery",
  },
  {
    id: 5,
    label: "Post Services",
    icon: <BsMegaphone color="#fff" size={25} />,
    route: "/newService",
  },
  {
    id: 6,
    label: "Messages",
    icon: <BiMessageDetail color="#fff" size={25} />,
    route: "/messages",
  },
  // {
  //   id: 6,
  //   label: "Bookings",
  //   icon: <BsCardChecklist color="#fff" size={25} />,
  //   route: "/newService",
  // },
];

const SideNav: React.FC<SideNavProps> = ({ openNav, setOpenNav }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [messageCount, setMessageCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();

  const fetchChatDetails = () => {
    if (!user || !user.bookedDocIds) return;

    const messagesRef = collection(firestore, "messages");

    try {
      const msgQuery = query(
        messagesRef,
        where(
          user.userType === "Client" ? "clientSeen" : "serviceProviderSeen",
          "==",
          false
        ),
        where("__name__", "in", user.bookedDocIds)
      );

      const unsubscribe = onSnapshot(
        msgQuery,
        (querySnapshot) => {
          const results = [];
          querySnapshot.forEach((doc) => {
            results.push(doc.data());
          });

          setMessageCount(results.length);
        },
        (error) => {
          console.error("Error fetching messages:", error);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unsubscribe = fetchChatDetails();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user?.bookedDocIds]);

  return (
    <>
      {pathName === "/" || pathName === "/login" || pathName === "/create-user"
        ? null
        : user?.email && (
            <aside
              id="logo-sidebar"
              aria-labelledby="logo-sidebar"
              className={`fixed top-0 font-Nunito left-0 z-[999] w-64  ${
                openNav
                  ? "md:-translate-x-full translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }   h-screen duration-700 ease-in-out transition-transform `}
              aria-label="Sidebar"
            >
              <button
                onClick={() => setOpenNav(!openNav)}
                className={`fixed ${
                  openNav ? "-right-3" : "-right-4"
                }  bg-gray-700/40 top-1 rounded-md`}
              >
                {openNav ? (
                  <MdChevronRight size={20} color="#fff" />
                ) : (
                  <MdChevronLeft size={20} color="#fff" />
                )}
              </button>
              <div className="h-full px-3 py-4 overflow-y-auto bg-[#3b9679]">
                <a
                  href="/dashboard"
                  className="flex items-center justify-center pl-2.5 mb-5"
                >
                  <img
                    src="/logo.png"
                    className="h-7 mr-3 my-2 "
                    alt="Flowbite Logo"
                  />
                </a>
                <ul className="space-y-2 font-medium h-[80%]">
                  {navItems.map((item) => {
                    if (
                      user?.userType === "Client" &&
                      item.label === "Post Services"
                    ) {
                      return null;
                    }

                    return (
                      <li key={item.id}>
                        <Link
                          href={item.route}
                          className="relative flex justify-between   items-center p-2 rounded-lg hover:bg-white/20"
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-3 text-white">
                              {item.label}
                            </span>
                          </div>
                          {item.label === "Messages" && messageCount !== 0 && (
                            <span className="min-h-[8px] min-w-[20px] flex items-center justify-center rounded-md text-xs text-gray-100 font-bold bg-red-400 p-1 px-2">
                              {user?.userType === "Client"
                                ? messageCount
                                : messageCount}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <button
                  onClick={() => {
                    auth.signOut();
                    dispatch(setUser({}));
                    router.push("/login");
                  }}
                  className="flex items-center justify-center p-2  rounded-lg hover:bg-white/20"
                >
                  <CiLogout color="#fff" size={25} />
                  <span className="ml-3 text-white font-bold">Logout</span>
                </button>
              </div>
            </aside>
          )}
    </>
  );
};

export default SideNav;
