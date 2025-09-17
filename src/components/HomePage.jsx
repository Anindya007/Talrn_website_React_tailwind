import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { CircleCheck,CircleArrowRight,ArrowUp} from "lucide-react"
import Marquee from 'react-fast-marquee';
import { useState, useEffect } from "react"
import Header from "../Header"
import Footer from "../Footer"

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setScrollProgress(progress)
      setShowScrollTop(scrollTop > 25)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }



  return (
    <div className="min-h-screen bg-white">
       {showScrollTop && (
        <div className="fixed right-6 bottom-6 z-50">
          <div className="relative">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                
                className="text-[#5271ff]"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${scrollProgress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <Button
              onClick={scrollToTop}
              size="sm"
              className="absolute inset-0 w-12 h-12 rounded-full bg-transparent hover:bg-transparent text-[#5271ff] shadow-lg transition-all duration-300 ease-out cursor-pointer"
            >
              <ArrowUp className="w-4 h-4"/>
            </Button>
          </div>
        </div>
      )}
  
      

      <Header />

      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                Find & Hire iOS Developers with Ease
              </h2>
              <p className="text-xl text-gray-600 mb-8 text-pretty">
                Hire the right talent to your team effortlessly within 24 hours.
              </p>
              <p className="text-gray-600 mb-8">
                Hire top-vetted remote iOS developers with strong technical & communication skills within 24 hours.
              </p>
              <div className="flex gap-1">
                <Input placeholder="Your work email" className="bg-white text-gray-900 h-12 placeholder:text-lg" />
                <Button className="bg-[#5271ff] hover:bg-blue-700 text-white px-8 py-6 text-lg">Hire iOS Dev</Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Looking for remote iOS dev jobs?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Apply here
                </a>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Developer Cards */}
              <Card className="p-4 developer-card">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">Gabriel J.</h4>
                    <p className="text-sm text-gray-600">Senior iOS Developer</p>
                    <p className="text-sm text-gray-500">Worked on McDonald's</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 developer-card">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">Thammarat K.</h4>
                    <p className="text-sm text-gray-600">iOS Developer</p>
                    <p className="text-sm text-gray-500">Worked on Compagnie</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 developer-card">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">Saurabh S.</h4>
                    <p className="text-sm text-gray-600">Senior iOS Developer</p>
                    <p className="text-sm text-gray-500">Worked on PayPal</p>
                  </div>
                </div>
              </Card>
              <Card className="relative p-4 developer-card">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">Ehab O.</h4>
                    <p className="text-sm text-gray-600">Senior iOS Developer</p>
                    <p className="text-sm text-gray-500">Worked on Apple</p>
                  </div>
                </div>
                
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 stats-section bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            Explore 411+ iOS developers from 70+ countries, delivering 250+ projects.
          </p>
          <p className="text-gray-600">
            Discover 102+ industry expert in Ecommerce, Health and Fitness & more with 326+ technology specialists in
            Swift, Objective-C & more
          </p>
        </div>
      </section>

      {/* Augment Team Section */}
      <section className="max-w-7xl mx-auto rounded-md py-8 px-4 sm:px-6 lg:px-8 section-dark text-white bg-slate-900">
        
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Augment your team with highly-skilled iOS Developers</h3>
            </div>
            <div>
              <Button className="bg-white text-gray-900 border-2 h-12 hover:bg-transparent hover:border-white hover:text-white cursor-pointer w-full">View Profiles</Button>
            </div>
          </div>
        
      </section>

      {/* Scale Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Scale your team with Talrn's immediately available resources
              </h3>
              <p className="text-gray-600 mb-8">
                Our developers and designers have previously worked in the same industry instantly.
              </p>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">What is your industry?</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-blue-600">
                    Healthcare
                  </Badge>
                  <Badge variant="secondary" className="text-blue-600">
                    Automotive
                  </Badge>
                  <Badge variant="secondary" className="text-blue-600">
                    Banking
                  </Badge>
                  <Badge variant="secondary" className="text-blue-600">
                    Capital Markets
                  </Badge>
                  <Badge variant="secondary" className="text-blue-600">
                    Travel
                  </Badge>
                  <Badge variant="secondary" className="text-blue-600">
                    Digital Commerce
                  </Badge>
                </div>
              </div>
            </div>
            {/* <div className="grid grid-cols-4 gap-2">
              
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-16 h-16 bg-gray-300 rounded-full"></div>
              ))}
            </div> */}
            <img src="https://talrn.com/assets/img/team.webp" alt="" />
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="max-w-7xl mx-auto rounded-md py-16 px-4 sm:px-6 lg:px-8 bg-black text-white bg-[url('https://talrn.com/assets/img/darkiphone.webp')]">
        
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Talrn is the world's largest network of top iOS talent.</h3>
              <p className="text-gray-300 mb-8">
                Save 70% on staff costs, while driving innovation & growth. Guaranteed.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="relative bg-[#5271ff] text-white p-6 feature-card hover:bg-[#f0ffff] hover:text-[#5271ff] cursor-pointer">
              <h4 className="font-semibold mb-2">Featured works on Talrn</h4>
              <p >Explore the best works delivered by developers.</p>
              <div className="absolute bottom-2 right-2">
                <CircleArrowRight />
              </div>
            </Card>
            <Card className="relative bg-[#5271ff] text-white p-6 feature-card hover:bg-[#f0ffff] hover:text-[#5271ff] cursor-pointer" >
              <h4 className="font-semibold mb-2">See all profiles on Talrn</h4>
              <p >Discover top developer profiles available on Talrn.</p>
              <div className="absolute bottom-2 right-2">
                <CircleArrowRight />
              </div>
            </Card>
            <Card className="relative bg-[#5271ff] text-white p-6 feature-card  hover:bg-[#f0ffff] hover:text-[#5271ff] cursor-pointer">
              <h4 className="font-semibold mb-2">Apply as a developer</h4>
              <p >Start your journey as a developer with Talrn.</p>
              <div className="absolute bottom-2 right-2">
                <CircleArrowRight />
              </div>
            </Card>
          </div>
      </section>

      {/* Client Success Section */}
      <section className="w-full rounded-md py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            We've helped <span className="text-blue-600">250+</span> clients outsource their software development
          </h3>
          <p className="text-gray-600 mb-12">And just to name a few.</p>

          {/* Client Logos Grid */}
            <Marquee pauseOnHover={false} gradient={false} speed={50}>
              <div className="flex space-x-12 items-center justify-center">
                {['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5', 'Client 6','Client 7',].map((client, index) => (
                  <div key={index} className="text-center client-logo">
                    <div className="w-48 h-32 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-sm font-bold">{client}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>

            <Marquee pauseOnHover={false} gradient={false} speed={50} direction="right">
              <div className="flex space-x-12 items-center justify-center">
                {['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5', 'Client 6','Client 7',].map((client, index) => (
                  <div key={index} className="text-center client-logo">
                    <div className="w-48 h-32 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-sm font-bold">{client}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
        </div> 
      
      </section>

      {/* Managed Services Section */}
      <section className="max-w-7xl mx-auto rounded-md py-16 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white bg-[url(https://talrn.com/assets/img/outsourcing.webp)]">
        
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Experience Talrn's managed services.</h3>
              <p className="text-gray-300">
                Full-scale resource augmentation with a dedicated success manager to manage your team's performance.
                Book a free call with our team.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#5271ff] text-white p-6 pricing-card">
              <h4 className="font-semibold mb-2">Premium Plan</h4>
              <p className="text-2xl font-bold mb-4">$160 /mo</p>
              <Button variant="outline" className="rounded-full w-1/3 text-blue-600 bg-white hover:bg-gray-100">
                Know More
              </Button>
            </Card>
            <Card className="bg-[#5271ff] text-white p-6 pricing-card">
              <h4 className="font-semibold mb-2">Standard Plan</h4>
              <p className="text-2xl font-bold mb-4">$0 /mo</p>
              <Button variant="outline" className="rounded-full w-1/3 text-blue-700 bg-white hover:bg-gray-100">
                Know More
              </Button>
            </Card>
            <Card className="bg-[#5271ff] text-white p-6 pricing-card">
              <h4 className="font-semibold mb-2">Customized Plan</h4>
              <p className="text-lg mb-4">Get in touch with our team</p>
              <Button variant="outline" className="rounded-full w-1/3 text-blue-800 bg-white hover:bg-gray-100">
                Contact Us
              </Button>
            </Card>
          </div>
      </section>

      {/* News Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4"><span className="text-[#5271ff]">Talrn</span> in the news</h3>
          <p className="text-gray-600 mb-12">We are recognized as one of the leading platforms for on-demand talent.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center news-logo">
              {/* <div className="w-24 h-16 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                <span className="text-sm font-bold">NBC</span>
              </div> */}
              <img src="https://talrn.com/assets/img/brands/z1.webp" alt="NBC Logo" className="w-24 h-16 object-contain mx-auto mb-2" />
            </div>
            <div className="text-center news-logo">
              {/* <div className="w-24 h-16 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                <span className="text-sm font-bold">FOX NEWS</span>
              </div>*/}
              <img src="https://talrn.com/assets/img/brands/z2.webp" alt="Fox News Logo" className="w-24 h-16 object-contain mx-auto mb-2" />
            </div> 
            <div className="text-center news-logo">
              {/* <div className="w-24 h-16 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                <span className="text-sm font-bold">CBS</span>
              </div> */}
              <img src="https://talrn.com/assets/img/brands/z3.webp" alt="CBS Logo" className="w-24 h-16 object-contain mx-auto mb-2" />
            </div>
            <div className="text-center news-logo">
              {/* <div className="w-24 h-16 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                <span className="text-sm font-bold">USA TODAY</span>
              </div> */}
              <img src="https://talrn.com/assets/img/brands/z4.webp" alt="USA Today Logo" className="w-24 h-16 object-contain mx-auto mb-2" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 mb-6 rounded-md sm:px-6 lg:px-8 cta-section bg-[#5271ff]  text-white">
        
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Start your outsourcing journey today</h3>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <CircleCheck className="w-4 h-4 mr-2"/>
                  <span>Independent</span>
                </div>
                <div className="flex items-center">
                  <CircleCheck className="w-4 h-4 mr-2" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center">
                  <CircleCheck className="w-4 h-4 mr-2" />
                  <span>Transparent</span>
                </div>
              </div>
            </div>
            <div>
              <Button className="bg-white text-gray-900 border-2 h-12 hover:bg-transparent hover:border-white hover:text-white cursor-pointer w-full" >View Profiles</Button>
            </div>
          </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
