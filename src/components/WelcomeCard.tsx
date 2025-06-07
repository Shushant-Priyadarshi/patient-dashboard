

const WelcomeCard = () => {
  return (
    <div><section className="bg-[#D7CFFF] p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Greetings!</h2>
                <p className="text-sm max-w-lg text-gray-700">
                 My Name is Shushant Priyadarshi, I am an 18-year-old Fullstack Developer based in India,
                 I specialized in React.js for the frontend and SpringBoot for the backend.
                 This is a Patient Management Dashboard.
                </p>
              </div>
              <div className="w-32 h-32 bg-purple-200 rounded-full" />
            </section></div>
  )
}

export default WelcomeCard