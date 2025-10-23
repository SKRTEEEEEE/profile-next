


import SliderTechs from "@/components/oth/slider-techs";
import { Button } from "@/components/ui/button";
import { ReadTechFlattenUseCase } from "@/core/application/usecases/tech.usecases";
import { techApiRepository } from "@/core/infrastructure/api/tech.repo";
// import { readAllTechsC } from "@/core/interface-adapters/controllers/tech/read.controller";
import { Link as LinkLocale } from "@/lib/i18n/routing";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { toast } from "sonner";

const AboutMePage = async () => {
    const {data:allLeng} = await new ReadTechFlattenUseCase(techApiRepository).execute()
    if(!allLeng)return toast.error("No techs found")
    // const {flattenTechs:allLeng} = await readAllTechsC()
    const t = await getTranslations()


    return (
        <main className="mx-8">
            
            
            <div className="md:grid md:grid-cols-2 md:pb-20 md:mx-auto flex flex-col-reverse justify-center items-center min-h-dvh max-w-5xl md:gap-6 gap-4 ">
                <section className="max-w-[450px]">

                    
                    <span className="md:inline hidden">
                    <h1 tabIndex={0} className="text-xl mb-4   leading-tight text-center sm:text-left md:text-4xl md:mb-2">{t("ceo.info.section.skills.h1.0")} <span className="font-bold text-secondary-ceo"> {t("ceo.info.section.skills.h1.1")}.</span></h1>
                    <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 md:mb-4'>{t("ceo.info.section.skills.h2")}: </h2>
                    <ul className="md:mb-3 xl:text-xl 
                    text-gray-300">
                        <li className="p-1 px-4 mb-2 border-secondary-ceo/10 border-4 rounded-md">
                            <span className="text-3xl" tabIndex={0}>Fullstack web JS</span><br />React.js, Next.js, Node.js, Express.js, MongoDB, Mongoose.js, TailwindCss, etc...
                        </li>
                        <li className="p-1 px-4 mb-2 border-secondary-ceo/10 border-4 rounded-md"><span className="text-3xl" tabIndex={0}>Fullstack dApp <i>EVM</i></span><br />Solidity, Ether.js, Thirdweb, Hardhat, Forge, Chainlink, etc... </li>
                    </ul>
                    </span>
                    <div className="space-y-2 flex flex-col w-full">
                        <Button className="w-full" variant={"secondary"}><LinkLocale href={{ pathname: "/docs/[slug]", params: { slug: "techs" } }}>{t("ceo.info.section.skills.buttons.tech")}</LinkLocale></Button>
                        <Button variant={"outline"} className="w-full"><Link href={"https://profile-skrt.vercel.app/ca/admin/techs"}>{t("ceo.info.section.skills.buttons.admin")}</Link></Button>
                    </div>


                </section>

                {/* SLIDER */}
                {allLeng?.length > 0 ? 
                    <section className="">
                        <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 mb-4' tabIndex={0}>{t("ceo.info.section.slider.h2")}: </h2>
                        <SliderTechs data={allLeng} />
                    </section> 
                :
                    <section>
                        <h2 className='hover:text-secondary-ceo-600/20 text-secondary-ceo-300 mb-4' tabIndex={0}>🚧Building.... //_🐲 </h2>
                    </section>}
            </div>
        </main>
    );
}

export default AboutMePage;