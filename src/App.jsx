import { useEffect, useState } from 'react';
import { VscLoading } from 'react-icons/vsc';

function App() {
	const [search, setSearch] = useState('');
	const [username, setUsername] = useState('');
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			if (search) {
				setLoading(true);
				setError(null);
				try {
					const res = await fetch(
						`https://api.github.com/users/${search}`
					);
					if (!res.ok) {
						throw new Error('User Not Found');
					}
					const data = await res.json();
					setUserData(data);
					setUsername(data.login);
					console.log(data);
				} catch (err) {
					setError(err.message);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchUserData();
	}, [search]);

	const handleSearch = () => {
		setSearch(username);
	};

	const handleInputChange = e => {
		setUsername(e.target.value);
		if (e.target.value === '') {
			setLoading(false);
			setError(null);
			setUserData(null);
		}
	};

	return (
		<div className='w-full h-screen items-center justify-center flex flex-col'>
			<div className=' h-screen w-full sm:w-4/5 md:w-2/3 lg:w-1/2 p-4'>
				<div className='flex justify-center items-center gap-4 px-4'>
					<input
						type='text'
						value={username}
						onChange={handleInputChange}
						placeholder='Enter Github Username'
						className='border-2 border-black rounded-xl w-full p-2 outline-none'
					/>
					<button
						onClick={handleSearch}
						className='bg-blue-600 px-4 py-2 rounded-xl text-white'
					>
						Search
					</button>
				</div>
				{loading ? (
					<div className='p-4 bg-blue-600 rounded-xl flex justify-center items-center text-white mt-4'>
						<VscLoading />
					</div>
				) : error ? (
					<div className='p-4 bg-blue-600 rounded-xl flex justify-center items-center text-white mt-4'>
						<h1>{error}</h1>
					</div>
				) : (
					userData && (
						<div className='p-4 bg-blue-600 rounded-xl flex flex-col gap-4 text-white mt-4'>
							<h1 className='text-center text-3xl flex justify-center items-center gap-10'>
								<img
									src={userData.avatar_url}
									alt='User Image'
									width={70}
									height={70}
									className='rounded-full'
								/>
								{userData.name
									? userData.name
									: userData.login}
							</h1>
							<p>
								Bio: {userData.bio}
							</p>
							<p>
								Number of Repositories:{' '}
								{userData.public_repos}
							</p>

							<p>
								Number of Followers: {userData.followers}
							</p>
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default App;
