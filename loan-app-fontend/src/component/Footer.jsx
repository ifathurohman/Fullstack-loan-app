const Footer = () => {
    return (
        <footer className="bg-sky-500 text-white body-font">
            <div className="container px-5 py-12 mx-auto flex flex-wrap">
                {/* About Section */}
                <div className="lg:w-1/4 md:w-1/2 w-full mb-10 lg:mb-0">
                    <h1 className="text-3xl font-bold font-montserrat tracking-wide mb-4">Loan App</h1>
                    <p className="text-sm font-normal font-montserrat leading-6">Welcome to Loan App, your platform for finding the right loan for your needs. We provide comprehensive loan services to ensure a smooth borrowing experience.</p>
                    <div className="flex mt-6">
                        <div className="w-10 h-10 mr-3 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24">
                                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                            </svg>
                        </div>
                        <div className="w-10 h-10 mr-3 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24">
                                <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9 V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977 C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"></path>
                            </svg>
                        </div>
                        <div className="w-10 h-10 mr-3 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                <path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"></path>
                            </svg>
                        </div>
                        <div className="w-10 h-10 mr-3 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8c0 .6.4 1 1 1h1v2a1 1 0 0 0 1.7.7L9.4 13H15c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1H4Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M8 17.2h.1l2.1-2.2H15a3 3 0 0 0 3-3V8h2c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-1v2a1 1 0 0 1-1.7.7L14.6 18H9a1 1 0 0 1-1-.8Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="lg:w-1/4 md:w-1/2 w-full lg:mt-0 mt-12 ml-auto">
                    <h2 className="text-base font-bold font-montserrat leading-tight mb-4">Contact Information</h2>
                    <ContactItem label="Address" value="123 Loan Street, Suite 101, Loan City, LC 12345" />
                    <ContactItem label="Phone" value="123-456-7890" />
                    <ContactItem label="Fax" value="123-456-7890" />
                    <ContactItem label="Email" value="info@loanapp.com" />
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-sky-500 text-center text-white text-sm font-normal font-open-sans leading-5 py-4">© Copyright 2024 | Loan App</div>
        </footer>
    );
}

const ContactItem = ({ label, value }) => {
    return (
        <div className="text-sm font-normal font-open-sans leading-relaxed mb-4">
            <span className="font-bold">{label}:</span> {value}
        </div>
    );
}

export default Footer;
