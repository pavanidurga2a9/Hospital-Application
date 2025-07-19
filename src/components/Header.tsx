import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import hospitalLogo from '@/assets/hospital-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Specialists', path: '/specialists' },
    { name: 'Register', path: '/register' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="border-b border-border py-2 hidden md:block">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@carehospital.com</span>
              </div>
            </div>
            <div className="text-primary font-medium">
              24/7 Emergency Services Available
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src={hospitalLogo} 
              alt="CareHospital Logo" 
              className="w-8 h-8 hover:animate-[spin-logo_2s_ease-in-out_3] transition-transform"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">CareHospital</h1>
              <p className="text-xs text-muted-foreground">Excellence in Healthcare</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.name}
              </button>
            ))}
            <Button variant="hero" size="sm" onClick={() => navigate('/register')}>
              Book Appointment
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button 
                variant="hero" 
                size="sm" 
                className="w-fit"
                onClick={() => {
                  navigate('/register');
                  setIsMenuOpen(false);
                }}
              >
                Book Appointment
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
