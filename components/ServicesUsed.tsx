import React from 'react'

const ServicesUsed = () => {
    return (
        <div>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg/8 font-semibold text-gray-900">Services Used</h2>
                    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img className="col-span-2 max-h-20 w-full object-contain lg:col-span-1" src="/metaplex-bg.png" alt="Transistor" width="168" height="58" />
                       
                        <img className="col-span-2 max-h-32 w-full object-contain lg:col-span-1" src="/Supabase.png" alt="Reform" width="168" height="58" />
                        <img className="col-span-2 max-h-20/30 w-full object-contain lg:col-span-1" src="/Next.js.png" alt="Tuple" width="168" height="58" />
                        <img className="col-span-2 max-h-20/30 w-full object-contain sm:col-start-2 lg:col-span-1" src="/Vercel.png" alt="SavvyCal" width="168" height="58" />
                        <img className="col-span-2 col-start-2 max-h-20/30 w-full object-contain sm:col-start-auto lg:col-span-1" src="/solana.png" alt="Statamic" width="168" height="58" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesUsed;