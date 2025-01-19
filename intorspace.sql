-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2025 at 06:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intorspace`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `admin_id` varchar(191) NOT NULL,
  `profileImage` varchar(191) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_on` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `admin_id`, `profileImage`, `name`, `email`, `phone`, `password`, `created_on`, `updated_on`) VALUES
(1, '', 'uploads/profiles/1727978067361Chintan-v1.775e08fc9d654ddaf214.webp', 'Sagar Maurya', 'sagar68742@gmail.com', '7020355294', '$2b$10$0ohjQc5FybyE8D9pBEXBx.bsVvDc7Glee.pgVkNGsTAGI0vdoK/la', '2024-09-29 12:05:33.601', '2024-09-29 06:35:33');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(191) NOT NULL,
  `content` longtext NOT NULL,
  `created_on` date NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `image`, `content`, `created_on`) VALUES
(12, 'Test', 'uploads/brands/1727978803135austin-distel-wD1LRb9OeEo-unsplash.webp', 'sdasdsad', '2024-10-03');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(191) NOT NULL,
  `created_on` date NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `slug`, `name`, `image`, `created_on`) VALUES
(13, 'furniture', 'Furniture', 'category/1732042364202_WhatsApp_Image_2024-11-05_at_09.48.42_6d8a0dc6.jpg', '2024-11-19'),
(14, 'sofas-and-seating', 'Sofas & Seating', 'category/1732040968910_WhatsApp_Image_2024-11-05_at_09.48.42_6fdf1f01.jpg', '2024-11-19');

-- --------------------------------------------------------

--
-- Table structure for table `legal_pages`
--

CREATE TABLE `legal_pages` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `legal_pages`
--

INSERT INTO `legal_pages` (`id`, `slug`, `title`, `content`) VALUES
(1, 'privacy-policy', 'Privacy Policy', '<h2><strong>Privacy Policy</strong></h2>'),
(2, 'terms-and-conditons', 'Terms And Conditons', '<h2>Terms And Conditons</h2><p><br></p><h2>Terms And Conditons</h2><p><br></p><p><br></p>'),
(3, 'return-and-cancellation-policy', 'Return and Cancellation policy', '<p>Return and Cancellation policy</p>'),
(5, 'market-place-policy', 'Market place Policy', '<ul><li><a href=\"http://localhost:3000/legal/market-place-policy\" rel=\"noopener noreferrer\" target=\"_blank\">Market place Policy</a></li></ul><p><br></p>'),
(6, 'footer-contnet', 'Footer', '<p><a href=\"https://intorspace-site.vercel.app/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: inherit;\">Intorspace</a>&nbsp;is a dynamic platform designed to revolutionize the way homemakers approach home improvement and design. We bridge the gap between homeowners and highly skilled professionals, offering a seamless experience for booking services and accessing a wealth of design inspiration. At Intorspace, we understand the importance of a well-designed home that reflects your personality and meets your functional needs. Our platform allows you to easily connect with a range of professionals, from interior designers and architects to contractors and decorators. Whether you\'re planning a major renovation or a small makeover, Intorspace provides the expertise and resources you need to turn your vision into reality.</p><h6>BOOK FREE CONSULTATION</h6><p>Explore our extensive collection of design ideas and inspiration on our website\'s Design Ideas page. Once you\'ve found inspiration for your project, simply click on the \"Book Free Consultation\" button next to the design idea you love. The professional will then reach out to you to schedule the consultation free at a convenient time. We look forward to assisting you with your home improvement project!</p><h6>BOOK FREE CONSULTATION</h6><p>Explore our extensive collection of design ideas and inspiration on our website\'s Design Ideas page. Once you\'ve found inspiration for your project, simply click on the \"Book Free Consultation\" button next to the design idea you love. The professional will then reach out to you to schedule the consultation free at a convenient time. We look forward to assisting you with your home improvement project!</p><h6>BOOK FREE CONSULTATION</h6><p>Explore our extensive collection of design ideas and inspiration on our website\'s Design Ideas page. Once you\'ve found inspiration for your project, simply click on the \"Book Free Consultation\" button next to the design idea you love. The professional will then reach out to you to schedule the consultation free at a convenient time. We look forward to assisting you with your home improvement project!</p><h6>BOOK FREE CONSULTATION</h6><p>Explore our extensive collection of design ideas and inspiration on our website\'s Design Ideas page. Once you\'ve found inspiration for your project, simply click on the \"Book Free Consultation\" button next to the design idea you love. The professional will then reach out to you to schedule the consultation free at a convenient time. We look forward to assisting you with your home improvement project!</p><h6>BOOK FREE CONSULTATION</h6><p>Explore our extensive collection of design ideas and inspiration on our website\'s Design Ideas page. Once you\'ve found inspiration for your project, simply click on the \"Book Free Consultation\" button next to the design idea you love. The professional will then reach out to you to schedule the consultation free at a convenient time. We look forward to assisting you with your home improvement project!</p>');

-- --------------------------------------------------------

--
-- Table structure for table `site_faqs`
--

CREATE TABLE `site_faqs` (
  `id` int(11) NOT NULL,
  `question` varchar(191) NOT NULL,
  `answer` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_faqs`
--

INSERT INTO `site_faqs` (`id`, `question`, `answer`) VALUES
(1, 'Test', 'Test');

-- --------------------------------------------------------

--
-- Table structure for table `site_feedback`
--

CREATE TABLE `site_feedback` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `feedback` varchar(1000) NOT NULL,
  `created_on` date NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(191) NOT NULL,
  `created_on` date NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subsubcategory`
--

CREATE TABLE `subsubcategory` (
  `id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `sub_cat_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(191) NOT NULL,
  `created_on` date NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('cdf52968-22ca-41bf-aaba-fe7e0fa54bd4', '22589aaa18468bb4e38d62abb538f0eb74e5dd5bafe4ba83c14ac7b35f0c3057', '2024-09-29 12:04:36.849', '20240929120217_update_categories_schema', NULL, NULL, '2024-09-29 12:04:36.780', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_email_key` (`email`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `legal_pages`
--
ALTER TABLE `legal_pages`
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `legal_pages_slug_key` (`slug`);

--
-- Indexes for table `site_faqs`
--
ALTER TABLE `site_faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_feedback`
--
ALTER TABLE `site_feedback`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `subcategory_cat_id_fkey` (`cat_id`);

--
-- Indexes for table `subsubcategory`
--
ALTER TABLE `subsubcategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `sub_sub_categories_cat_id_fkey` (`cat_id`),
  ADD KEY `sub_sub_categories_sub_cat_id_fkey` (`sub_cat_id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `legal_pages`
--
ALTER TABLE `legal_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `site_faqs`
--
ALTER TABLE `site_faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `site_feedback`
--
ALTER TABLE `site_feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `subsubcategory`
--
ALTER TABLE `subsubcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `SubCategory_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `subsubcategory`
--
ALTER TABLE `subsubcategory`
  ADD CONSTRAINT `SubSubCategory_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `SubSubCategory_sub_cat_id_fkey` FOREIGN KEY (`sub_cat_id`) REFERENCES `subcategory` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
