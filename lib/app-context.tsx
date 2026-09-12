'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  BusinessProfile,
  Course,
  CommunityPost,
  Product,
  Mentor,
  ProgramOpportunity,
  UserRole,
  GrowthScoreReport,
} from '@/lib/types';
import {
  INITIAL_USER,
  INITIAL_BUSINESS,
  INITIAL_COURSES,
  INITIAL_POSTS,
  INITIAL_PRODUCTS,
  INITIAL_MENTORS,
  INITIAL_PROGRAMS,
} from '@/lib/supabase/mock-data';
import { calculateGrowthScore } from '@/modules/growth-score/calculator';

interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  business: BusinessProfile;
  updateBusiness: (updates: Partial<BusinessProfile>) => void;
  growthReport: GrowthScoreReport;
  courses: Course[];
  enrollCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonIndex: number) => void;
  passQuiz: (courseId: string) => void;
  posts: CommunityPost[];
  addPost: (title: string, content: string, category: CommunityPost['category'], tags: string[]) => void;
  toggleLikePost: (postId: string) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'businessName' | 'rating' | 'reviewsCount'>) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  mentors: Mentor[];
  requestMentorSession: (mentorId: string, notes: string) => boolean;
  programs: ProgramOpportunity[];
  registeredProgramIds: string[];
  applyToProgram: (programId: string) => boolean;
  xpPoints: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [business, setBusiness] = useState<BusinessProfile>(INITIAL_BUSINESS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [programs] = useState<ProgramOpportunity[]>(INITIAL_PROGRAMS);
  const [registeredProgramIds, setRegisteredProgramIds] = useState<string[]>(['prg-01']);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [xpPoints, setXpPoints] = useState<number>(350);

  // Recalculate Growth Score whenever business or activity changes
  const [growthReport, setGrowthReport] = useState<GrowthScoreReport>(() =>
    calculateGrowthScore({
      business: INITIAL_BUSINESS,
      completedLessonsCount: 6,
      quizzesPassedCount: 2,
      communityPostsCount: 3,
      communityCommentsCount: 8,
      activeProductsCount: 4,
      transactionsCount: 18,
    })
  );

  const updateBusiness = (updates: Partial<BusinessProfile>) => {
    setBusiness((prev) => {
      const updated = { ...prev, ...updates };
      const newReport = calculateGrowthScore({
        business: updated,
        completedLessonsCount: courses.filter((c) => c.progress === 100).length * 4,
        quizzesPassedCount: courses.filter((c) => c.certificateEarned).length * 2,
        communityPostsCount: posts.filter((p) => p.authorId === user.id).length + 2,
        activeProductsCount: products.filter((p) => p.sellerId === prev.id).length + 3,
        transactionsCount: 22,
      });
      updated.growthScore = newReport.overallScore;
      updated.growthLevel = newReport.level;
      setGrowthReport(newReport);
      return updated;
    });
  };

  const setCurrentRole = (role: UserRole) => {
    setUser((prev) => ({ ...prev, role }));
  };

  const enrollCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolled: true, progress: 10 } : c))
    );
  };

  const completeLesson = (courseId: string, lessonIndex: number) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId && c.curriculum[lessonIndex]) {
          const updatedCurriculum = [...c.curriculum];
          updatedCurriculum[lessonIndex] = { ...updatedCurriculum[lessonIndex], completed: true };
          const completedCount = updatedCurriculum.filter((l) => l.completed).length;
          const progress = Math.round((completedCount / updatedCurriculum.length) * 100);
          return { ...c, curriculum: updatedCurriculum, progress };
        }
        return c;
      })
    );
    setXpPoints((x) => x + 25);
  };

  const passQuiz = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? { ...c, progress: 100, certificateEarned: true }
          : c
      )
    );
    setXpPoints((x) => x + 150);
    // Update score after earning certificate
    updateBusiness({});
  };

  const addPost = (
    title: string,
    content: string,
    category: CommunityPost['category'],
    tags: string[]
  ) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: user.id,
      authorName: user.fullName,
      authorBusiness: business.businessName,
      authorRole: user.role,
      category,
      title,
      content,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date().toISOString(),
      tags,
    };
    setPosts([newPost, ...posts]);
    setXpPoints((x) => x + 20);
    updateBusiness({});
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1),
          };
        }
        return p;
      })
    );
  };

  const addProduct = (
    productData: Omit<Product, 'id' | 'sellerId' | 'businessName' | 'rating' | 'reviewsCount'>
  ) => {
    const newProd: Product = {
      ...productData,
      id: `prd-${Date.now()}`,
      sellerId: business.id,
      businessName: business.businessName,
      rating: 5.0,
      reviewsCount: 0,
    };
    setProducts([newProd, ...products]);
    setXpPoints((x) => x + 50);
    updateBusiness({});
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const requestMentorSession = (_mentorId: string, _notes: string): boolean => {
    setXpPoints((x) => x + 30);
    return true;
  };

  const applyToProgram = (programId: string): boolean => {
    if (!registeredProgramIds.includes(programId)) {
      setRegisteredProgramIds([...registeredProgramIds, programId]);
      setXpPoints((x) => x + 40);
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentRole: user.role,
        setCurrentRole,
        business,
        updateBusiness,
        growthReport,
        courses,
        enrollCourse,
        completeLesson,
        passQuiz,
        posts,
        addPost,
        toggleLikePost,
        products,
        addProduct,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        mentors,
        requestMentorSession,
        programs,
        registeredProgramIds,
        applyToProgram,
        xpPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
