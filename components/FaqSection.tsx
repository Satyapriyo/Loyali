// components/FaqSection.tsx
"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is an NFT?",
        answer: "NFT stands for Non-Fungible Token. It's a unique digital item that lives on the blockchain."
    },
    {
        question: "What are cNFTs?",
        answer: "cNFTs (compressed NFTs) are lightweight versions of NFTs on Solana that reduce cost and increase scalability."
    },
    {
        question: "How can I mint an NFT?",
        answer: "Just connect your wallet, fill in the required details, and click 'Mint'. We'll handle the rest on the blockchain."
    },
    {
        question: "Is it safe to use my wallet here?",
        answer: "Yes. We use secure wallet adapters and do not store your private keys or sensitive information."
    },
    {
        question: "Can I sell or transfer my NFTs?",
        answer: "Absolutely. Once minted, you can list your NFTs on marketplaces like Magic Eden or transfer them directly."
    }
]

export default function FaqSection() {
    return (
        <div className="max-w-3xl mx-auto p-4 mt-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-white">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="border border-violet-500 rounded-xl p-2">
                        <AccordionTrigger className="text-left text-white">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
