import { BsFillBarChartFill, BsFillBriefcaseFill } from 'react-icons/bs';
import { BiAtom } from 'react-icons/bi';

import contact from '../../../../assets/pets.jpg';
import aboutus from '../../../../assets/aboutus.jpg';

const AboutUs = () => {
  return (
    <div className="relative mt-20" style={{ backgroundImage: url(${contact}), backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-black opacity-70" />

      <div className="relative z-10 text-white py-16">
        <div className="flex flex-col items-center justify-center mt-20 mb-20" id="services">
          <h3 className="text-[#ff0000]">Know about us</h3>
          <h1 className="text-white text-2xl md:text-4xl font-metamorphous font-bold text-center">_About PetHub_</h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="px-10 py-10 w-full lg:max-w-[1200px] mx-auto">
            <div className="flex gap-16 items-center justify-center">
              <div>
                <BsFillBarChartFill className="text-3xl text-warning" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Our Vision</h1>
                <p>PetHub envisions a world where every pet finds their forever home. We're committed to revolutionizing pet adoption by connecting loving pet owners with deserving animals.</p>
              </div>
            </div>
            {/* */}
            <div className="flex gap-16 items-center justify-center my-10">
              <div>
                <BiAtom className="text-3xl  text-success" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Our Mission</h1>
                <p>PetHub's mission is to build a thriving community of pet lovers. We provide a safe and reliable platform for pet adoption, fostering meaningful connections between pets and their new families.</p>
              </div>
            </div>
            {/* */}
            <div className="flex gap-16 items-center justify-center">
              <div>
                <BsFillBriefcaseFill className="text-3xl  text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Our Values</h1>
                <p>PetHub is guided by compassion, integrity, and a deep respect for all animals. We believe in ethical pet adoption practices and strive to create a positive impact on the lives of pets and their owners.</p>
              </div>
            </div>
          </div>
          <div>
            <img src={aboutus} alt="" className="w-9/12 rounded-lg hidden lg:flex" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;