import { useState, useEffect } from 'react';
import PageNav from '../components/PageNav'; // Adjust import path as needed

export default function AboutPage() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const fetchUsers = async () => {
  //   try {
  //     // TODO: Replace with your actual API endpoint
  //     // const response = await fetch('/api/users');
  //     // const data = await response.json();

  //     // Mock data for demonstration
  //     const mockUsers = [
  //       {
  //         id: 1,
  //         name: 'Sarah Chen',
  //         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  //         location: 'Tokyo, Japan',
  //         citiesVisited: 47,
  //         joinedDate: 'Jan 2024',
  //         bio: 'Wanderlust enthusiast exploring Asia one city at a time. Coffee lover and street food connoisseur.',
  //         favoriteCity: 'Kyoto',
  //         travelStyle: 'Slow travel',
  //       },
  //       {
  //         id: 2,
  //         name: 'Marcus Rodriguez',
  //         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
  //         location: 'Barcelona, Spain',
  //         citiesVisited: 63,
  //         joinedDate: 'Mar 2023',
  //         bio: 'Digital nomad and photographer capturing the beauty of urban landscapes around the world.',
  //         favoriteCity: 'Lisbon',
  //         travelStyle: 'Urban explorer',
  //       },
  //       {
  //         id: 3,
  //         name: 'Aisha Patel',
  //         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
  //         location: 'Mumbai, India',
  //         citiesVisited: 34,
  //         joinedDate: 'Jul 2024',
  //         bio: 'Adventure seeker with a passion for mountains and local cuisines. Always ready for the next journey.',
  //         favoriteCity: 'Kathmandu',
  //         travelStyle: 'Adventure',
  //       },
  //       {
  //         id: 4,
  //         name: 'Oliver Jensen',
  //         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
  //         location: 'Copenhagen, Denmark',
  //         citiesVisited: 52,
  //         joinedDate: 'Nov 2023',
  //         bio: "Cycling enthusiast exploring Europe's hidden gems. Love connecting with locals and finding authentic experiences.",
  //         favoriteCity: 'Amsterdam',
  //         travelStyle: 'Eco-friendly',
  //       },
  //       {
  //         id: 5,
  //         name: 'Luna Martinez',
  //         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
  //         location: 'Mexico City, Mexico',
  //         citiesVisited: 41,
  //         joinedDate: 'May 2024',
  //         bio: 'Artist and culture enthusiast documenting vibrant street art and festivals across Latin America.',
  //         favoriteCity: 'Havana',
  //         travelStyle: 'Cultural immersion',
  //       },
  //       {
  //         id: 6,
  //         name: "James O'Connor",
  //         avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  //         location: 'Dublin, Ireland',
  //         citiesVisited: 28,
  //         joinedDate: 'Sep 2024',
  //         bio: 'History buff and pub crawler exploring the stories behind ancient cities and their modern cultures.',
  //         favoriteCity: 'Edinburgh',
  //         travelStyle: 'Historical',
  //       },
  //     ];
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // Replace this with your actual API call
  //   const users = fetchUsers();
  //   setUsers(users);
  //   setLoading(false);
  // }, []);

  const users = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      location: 'Tokyo, Japan',
      citiesVisited: 47,
      joinedDate: 'Jan 2024',
      bio: 'Wanderlust enthusiast exploring Asia one city at a time. Coffee lover and street food connoisseur.',
      favoriteCity: 'Kyoto',
      travelStyle: 'Slow travel',
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      location: 'Barcelona, Spain',
      citiesVisited: 63,
      joinedDate: 'Mar 2023',
      bio: 'Digital nomad and photographer capturing the beauty of urban landscapes around the world.',
      favoriteCity: 'Lisbon',
      travelStyle: 'Urban explorer',
    },
    {
      id: 3,
      name: 'Aisha Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
      location: 'Mumbai, India',
      citiesVisited: 34,
      joinedDate: 'Jul 2024',
      bio: 'Adventure seeker with a passion for mountains and local cuisines. Always ready for the next journey.',
      favoriteCity: 'Kathmandu',
      travelStyle: 'Adventure',
    },
    {
      id: 4,
      name: 'Oliver Jensen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
      location: 'Copenhagen, Denmark',
      citiesVisited: 52,
      joinedDate: 'Nov 2023',
      bio: "Cycling enthusiast exploring Europe's hidden gems. Love connecting with locals and finding authentic experiences.",
      favoriteCity: 'Amsterdam',
      travelStyle: 'Eco-friendly',
    },
    {
      id: 5,
      name: 'Luna Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
      location: 'Mexico City, Mexico',
      citiesVisited: 41,
      joinedDate: 'May 2024',
      bio: 'Artist and culture enthusiast documenting vibrant street art and festivals across Latin America.',
      favoriteCity: 'Havana',
      travelStyle: 'Cultural immersion',
    },
    {
      id: 6,
      name: "James O'Connor",
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      location: 'Dublin, Ireland',
      citiesVisited: 28,
      joinedDate: 'Sep 2024',
      bio: 'History buff and pub crawler exploring the stories behind ancient cities and their modern cultures.',
      favoriteCity: 'Edinburgh',
      travelStyle: 'Historical',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-8 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-6xl font-bold text-white">
            Meet Roaming Souls
          </h1>
          <p className="text-2xl text-green-200">
            Connect with travelers who share your passion for exploration
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

function UserCard({ user }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 h-96"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`transform-style-3d relative h-full w-full transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute h-full w-full rounded-2xl bg-gradient-to-br from-green-800 to-green-900 p-8 shadow-xl backface-hidden">
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-40 w-40 rounded-full border-4 border-green-200 bg-white shadow-lg"
            />
            <h3 className="text-3xl font-bold text-white">{user.name}</h3>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute h-full w-full rotate-y-180 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 p-8 shadow-xl backface-hidden">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white">
                {user.name}
              </h3>

              <div className="mb-4 flex items-center gap-2 text-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg">{user.location}</span>
              </div>

              <div className="mb-4 rounded-lg bg-slate-600 p-3 text-center">
                <div className="text-3xl font-bold text-green-200">
                  {user.citiesVisited}
                </div>
                <div className="text-sm text-green-100">Cities Visited</div>
              </div>

              <p className="mb-4 leading-relaxed text-green-100">{user.bio}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Favorite city: {user.favoriteCity}</span>
              </div>
              <div className="flex items-center gap-2 text-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span>Travel style: {user.travelStyle}</span>
              </div>
              <div className="flex items-center gap-2 text-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Joined: {user.joinedDate}</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-500">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
