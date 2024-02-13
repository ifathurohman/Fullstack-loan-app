import Loan from "./Loan";

const Hero = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="lg:w-2/3 mx-auto" />
        <div className="flex flex-wrap w-full bg-gray-100 py-20 relative">
          <img
            alt="gallery"
            className="w-full object-cover h-screen object-center block absolute inset-0"
            src="https://www.loanmarket.co.id/assets/img/banner/mainbanner.jpg"
          />
          <div className="pt-[100px] pl-[109px] md:w-1/2 md:pr-12 md:py-8 mb-10 md:mb-0 pb-10 z-0">
            <h1 className="text-white text-4xl font-extrabold font-['Montserrat'] leading-[50.04px] pb-[29px]">
              Instant Loan Online <br />
              Get up to Rs. 20,000 in 30 minutes.
            </h1>
            <p className="w-[419px] text-white text-base font-medium font-['Montserrat'] leading-normal pb-[29px]">
              Quick, convenient & secure instant loan app in India. Cash
              transferred directly to your account. Enjoy flexible repayment
              options & tenures up to 12 months. Our service offers you the
              simplest and quickest way to get an instant loan, without any
              hidden fees or commissions
            </p>
          </div>
          <div className="pt-[100px] pl-[109px] md:w-1/2 md:pr-12 md:py-8 mb-10 md:mb-0 pb-10 z-0">
            <Loan />
          </div>

        </div>
      </section>
    </div>
  );
};

export default Hero;
