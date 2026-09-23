import { useNavigate } from 'react-router-dom';
import { 
  Navbar, 
  Hero, 
  ProblemSolution, 
  Features, 
  VendorHierarchySection, 
  PermissionDelegationSection, 
  ComplianceSection, 
  FleetOperations, 
  HowItWorks, 
  ProductPreview, 
  FinalCTA, 
  Footer 
} from '@/components/landing';

export function LandingPage() {
  const navigate = useNavigate();

  const handleOpenDashboard = () => {
    navigate('/dashboard');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleExploreFeatures = () => {
    const el = document.querySelector('#features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* 1. Sticky Navigation Bar */}
      <Navbar 
        onOpenDashboard={handleOpenDashboard} 
        onSignIn={handleSignIn} 
      />

      <main className="flex-1 w-full">
        {/* 2. Hero Section with Interactive Dashboard Window */}
        <Hero 
          onOpenDashboard={handleOpenDashboard}
          onExploreFeatures={handleExploreFeatures}
        />

        {/* 3. Problem to Solution Transformation */}
        <ProblemSolution />

        {/* 4. 6 Core Features Grid */}
        <Features onSelectFeature={() => handleOpenDashboard()} />

        {/* 5. N-Level Vendor Hierarchy Interactive Explorer */}
        <VendorHierarchySection />

        {/* 6. Permission Delegation Showcase */}
        <PermissionDelegationSection />

        {/* 7. Automated Compliance Engine Showcase */}
        <ComplianceSection />

        {/* 8. Fleet Operations Split Layout & Roster */}
        <FleetOperations onOpenDashboard={handleOpenDashboard} />

        {/* 9. 5-Step Lifecycle: How It Works */}
        <HowItWorks />

        {/* 10. Application Surface Previews */}
        <ProductPreview onOpenDashboard={handleOpenDashboard} />

        {/* 11. Final High-Converting Conversion CTA */}
        <FinalCTA 
          onOpenDashboard={handleOpenDashboard} 
          onExploreFeatures={handleExploreFeatures} 
        />
      </main>

      {/* 12. Enterprise SaaS Footer */}
      <Footer 
        onOpenDashboard={handleOpenDashboard} 
        onSignIn={handleSignIn} 
      />
    </div>
  );
}

export default LandingPage;
