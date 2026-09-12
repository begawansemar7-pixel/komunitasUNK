// Komunitas UMKM Naik Kelas - Global Type Definitions

export type UserRole =
  | 'PLATFORM_SUPER_ADMIN'
  | 'KADIN_ADMIN'
  | 'REGIONAL_ADMIN'
  | 'COMMUNITY_ADMIN'
  | 'COMMUNITY_MODERATOR'
  | 'MENTOR'
  | 'TRAINER'
  | 'PARTNER'
  | 'UMKM_OWNER'
  | 'UMKM_STAFF'
  | 'BUYER'
  | 'INVESTOR'
  | 'FINANCIAL_PARTNER'
  | 'GOVERNMENT'
  | 'GUEST';

export type GrowthLevel =
  | 'Pemula'
  | 'Berkembang'
  | 'Siap Naik Kelas'
  | 'Naik Kelas'
  | 'UMKM Unggul';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  avatarUrl?: string;
  role: UserRole;
  organizations: OrganizationMembership[];
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  level: 'NATIONAL' | 'PROVINCE' | 'CITY' | 'COMMUNITY' | 'BUSINESS';
  parentId?: string;
}

export interface OrganizationMembership {
  orgId: string;
  orgName: string;
  role: UserRole;
}

export interface BusinessProfile {
  id: string;
  ownerId: string;
  ownerName: string;
  businessName: string;
  category: string;
  subcategory: string;
  description: string;
  foundedYear: number;
  province: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  instagram?: string;
  whatsapp: string;
  logoUrl?: string;
  employeesCount: number;
  revenueRange: string; // e.g. '< 50 Juta', '50-300 Juta', '300 Juta - 2.5 Miliar', '> 2.5 Miliar'
  digitalizationLevel: 'Tradisional' | 'Go Digital Awal' | 'Go Digital Aktif' | 'Digital Native';
  certification: {
    nib: boolean;
    halal: boolean;
    pirtOrBpom: boolean;
    haki: boolean;
    isoOrSni: boolean;
  };
  marketplacePresence: {
    shopee: boolean;
    tokopedia: boolean;
    tiktokShop: boolean;
    websiteSendiri: boolean;
    inaMarket: boolean;
  };
  exportReadiness: 'Belum Siap' | 'Potensi Ekspor' | 'Siap Ekspor' | 'Aktif Ekspor';
  growthScore: number;
  growthLevel: GrowthLevel;
}

export interface GrowthScoreDimension {
  key: string;
  name: string;
  score: number; // 0-100
  weight: number; // percentage
  status: 'Perlu Ditingkatkan' | 'Cukup' | 'Baik' | 'Unggul';
  insight: string;
  actionableStep: string;
}

export interface GrowthScoreReport {
  overallScore: number;
  level: GrowthLevel;
  dimensions: {
    profile: GrowthScoreDimension;
    digitalization: GrowthScoreDimension;
    learning: GrowthScoreDimension;
    certification: GrowthScoreDimension;
    marketplace: GrowthScoreDimension;
    community: GrowthScoreDimension;
    transaction: GrowthScoreDimension;
    readiness: GrowthScoreDimension;
  };
  keyStrengths: string[];
  immediateActions: string[];
  calculatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  instructor: string;
  instructorRole: string;
  duration: string;
  xpReward: number;
  lessonsCount: number;
  thumbnail: string;
  description: string;
  curriculum: {
    title: string;
    duration: string;
    completed?: boolean;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  enrolled?: boolean;
  progress?: number; // 0-100
  certificateEarned?: boolean;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorBusiness: string;
  authorAvatar?: string;
  authorRole: string;
  category: 'Informasi' | 'Tips Bisnis' | 'Digital Marketing' | 'Finansial' | 'Legal' | 'Halal' | 'Export' | 'Procurement' | 'Technology' | 'Success Story';
  title: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt: string;
  tags: string[];
}

export interface Product {
  id: string;
  sellerId: string;
  businessName: string;
  name: string;
  category: 'Kuliner' | 'Fashion' | 'Kerajinan' | 'Jasa' | 'Digital' | 'Pertanian' | 'Beauty' | 'Retail';
  price: number;
  minOrder: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  location: string;
  image: string;
  description: string;
  halalCertified: boolean;
  b2bReady: boolean;
  exportReady: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  headline: string;
  company: string;
  industry: string[];
  expertise: string[];
  rating: number;
  sessionsCompleted: number;
  avatar: string;
  availability: 'Tersedia Pekan Ini' | 'Jadwal Penuh' | 'Sesuai Janji';
  bio: string;
}

export interface ProgramOpportunity {
  id: string;
  title: string;
  organizer: 'KADIN Indonesia' | 'Kementerian Koperasi & UKM' | 'Bank Indonesia' | 'BUMN' | 'Global Partner';
  type: 'Training' | 'Business Matching' | 'Financing' | 'Sertifikasi Halal' | 'Go Export' | 'Expo';
  targetCategory: string;
  quota: number;
  registeredCount: number;
  deadline: string;
  status: 'Buka Pendaftaran' | 'Segera Dibuka' | 'Ditutup';
  description: string;
  benefits: string[];
  eligibility: string[];
}
