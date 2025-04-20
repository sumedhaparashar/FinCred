export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Twitter"
          >
            <i className="ri-twitter-fill text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Facebook"
          >
            <i className="ri-facebook-circle-fill text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Instagram"
          >
            <i className="ri-instagram-fill text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="GitHub"
          >
            <i className="ri-github-fill text-xl"></i>
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Fincread, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
