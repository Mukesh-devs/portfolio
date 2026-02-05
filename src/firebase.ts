import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCnH0IhjnhinOUzmGgoaCps5cDcFsfHoBM",
  authDomain: "mukesh-murugan.firebaseapp.com",
  projectId: "mukesh-murugan",
  storageBucket: "mukesh-murugan.firebasestorage.app",
  messagingSenderId: "981209095083",
  appId: "1:981209095083:web:43af44a7385a69fbde50ee",
  measurementId: "G-DREPBCR4GC"
};

const app = initializeApp(firebaseConfig);

// ✅ Analytics must be guarded (SSR / browser check)
isSupported().then((yes) => {
  if (yes) {
    getAnalytics(app);
  }
});

export default app;
