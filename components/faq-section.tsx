import Accordion from "@/components/accordion"

type QA = { q: string; a: string }
type Category = { category: string; items: QA[] }

const FAQ: Category[] = [
  {
    category: "Pricing & Minimums",
    items: [
      {
        q: "How is embroidery priced?",
        a: "Embroidery is usually priced per item, with the cost driven mainly by the stitch count of your design rather than its physical size — a dense, detailed logo costs more to stitch than a simple one. Larger orders bring the per-item price down. We'll always quote clearly so you know the all-in cost before you commit.",
      },
      {
        q: "Is there a minimum order quantity?",
        a: "Our minimum order is [X] pieces. This is common across the industry because each design has to be set up (digitised) before stitching begins, and that setup is most cost-effective when spread across a number of garments. If you need fewer items, talk to us — we can sometimes accommodate smaller runs at an adjusted rate.",
      },
      {
        q: "Are there setup or digitising fees?",
        a: "Yes — there's a one-off digitising fee of [£X] the first time we convert your logo into an embroidery file. Once that file exists, it's stored on our system, so any future orders of the same design won't incur the fee again.",
      },
      {
        q: "Do you offer discounts for larger or repeat orders?",
        a: "We do. Pricing is tiered, so the more you order, the lower the per-item cost. Repeat customers also benefit from already-digitised artwork, which keeps reorders quick and economical.",
      },
    ],
  },
  {
    category: "Artwork & Design",
    items: [
      {
        q: "Can you embroider my existing logo?",
        a: "In almost all cases, yes. We can work from your logo and convert it into a stitch file. For best results, send us the highest-quality version you have — ideally a vector file such as .ai, .eps, .pdf or .svg. We can also work from a high-resolution .png or .jpg if that's all you have.",
      },
      {
        q: 'What is "digitising" and do I have to pay for it every time?',
        a: "Digitising is the process of converting your logo into a specialised file that tells the embroidery machine exactly where to place each stitch. It's a one-time process per design — once it's done, we keep the file on record, so you only pay for it once no matter how many times you reorder.",
      },
      {
        q: "How many colours can my design have?",
        a: "Embroidery handles multiple colours well, and most logos reproduce beautifully. Very fine colour gradients or photographic detail don't translate to thread, so we may suggest simplifying those areas. We'll advise you if your artwork needs any adjustment.",
      },
      {
        q: "Will I see a proof before the full order is made?",
        a: "Yes. Before we run your order, we'll provide a digital proof (and, on request, a physical sewn-out sample) so you can approve the size, placement, and colours. We don't proceed to the full run until you're happy.",
      },
      {
        q: "Can you match my exact brand colours?",
        a: "We match thread colours as closely as possible to your brand, and we can work to Pantone references. Bear in mind that thread is a physical material, so there may be a very slight variation from an on-screen or printed colour — we'll always get as close as the thread range allows.",
      },
    ],
  },
  {
    category: "Garments & Products",
    items: [
      {
        q: "Can I supply my own garments, or do I buy them from you?",
        a: "Both options work. You're welcome to buy garments from our range, which guarantees compatibility, or supply your own. If you supply your own, please note that we can't be held responsible for any garment damaged during the embroidery process, though this is rare.",
      },
      {
        q: "What products can be embroidered?",
        a: "A wide variety — polo shirts, t-shirts, sweatshirts, fleeces, jackets, softshells, caps and beanies, aprons, bags, towels, and more. If you have a specific item in mind, ask us and we'll confirm whether it's suitable.",
      },
      {
        q: "Are there fabrics or items that don't work well with embroidery?",
        a: "Very thin, stretchy, or waterproof fabrics can be more challenging, as can some highly technical sportswear. We can usually still embroider these with the right backing and technique, but in some cases we may recommend print instead. We'll let you know if your chosen item isn't ideal.",
      },
      {
        q: "Where can the logo go, and how big can it be?",
        a: "Common placements include the left or right chest, sleeve, back, and cap front. A standard left-chest logo is typically around [8–10cm] wide. Larger back designs are possible too. We'll recommend the best size and position for your design and garment.",
      },
    ],
  },
  {
    category: "Quality & Durability",
    items: [
      {
        q: "How well does embroidery last?",
        a: "Embroidery is one of the most durable decoration methods available. Because the design is stitched into the fabric rather than printed on top, it won't crack, peel, or fade with washing, and it keeps a premium, professional look for the life of the garment.",
      },
      {
        q: "Embroidery or print — which is better for me?",
        a: "Embroidery suits logos, text, and smaller designs where durability and a high-end finish matter — ideal for workwear, uniforms, and corporate clothing. Print is better for large, detailed, or photographic designs and very lightweight fabrics. We're happy to advise based on your logo and how the garments will be used.",
      },
      {
        q: "Is there a limit to design detail or size?",
        a: "Very small text and fine detail can be hard to reproduce in thread, so there's a practical minimum size for legibility. There's also a maximum stitch area per placement. If your design pushes these limits, we'll suggest the best way to adapt it.",
      },
    ],
  },
  {
    category: "Turnaround & Logistics",
    items: [
      {
        q: "What's your typical turnaround time?",
        a: "Standard turnaround is approximately [X working days] from artwork approval. First orders take slightly longer because of the digitising step. Reorders of existing designs are usually quicker.",
      },
      {
        q: "Do you offer rush orders?",
        a: "Yes, subject to availability. If you have a deadline, let us know up front and we'll do our best to meet it — a rush fee may apply.",
      },
      {
        q: "Can I reorder the same design later?",
        a: "Absolutely. Once your design is digitised and on file, reorders are fast and don't require repeat setup fees. Just let us know the quantity and garments.",
      },
      {
        q: "Do you ship, and what does it cost?",
        a: "Yes, we ship to [your locations]. Delivery cost depends on order size and destination, and we'll confirm this with your quote. Collection may also be available.",
      },
    ],
  },
  {
    category: "Ordering, Sizing & Personalisation",
    items: [
      {
        q: "Can I mix garment sizes and colours in one order?",
        a: "Yes. You can order a range of sizes and colours within the same order, as long as the embroidered design stays the same.",
      },
      {
        q: "Can each item have a different name or job title?",
        a: "Yes — individual names, roles, or numbers can be added to each garment. This personalisation may carry a small additional cost per item, which we'll include in your quote.",
      },
      {
        q: "What happens if there's a mistake or I'm not happy?",
        a: "If we make an error against your approved proof, we'll put it right at no cost to you. Because each order is custom-made to your specification, we're unable to accept returns for change of mind, so please check your proof carefully before approving.",
      },
    ],
  },
  {
    category: "Payment & Accounts",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept [bank transfer / card / etc.]. For new or larger orders, we may ask for a deposit before production begins.",
      },
      {
        q: "Do you offer business accounts or invoicing?",
        a: "Yes. For regular and repeat customers we can set up an account with invoicing terms, making ongoing orders simple to manage. Get in touch to discuss setting this up.",
      },
    ],
  },
]

export default function FaqSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="font-display text-center text-2xl font-[900] text-black">FAQ</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
        Everything you need to know about ordering custom embroidery for your business — from
        artwork and pricing to turnaround and care. If your question isn't answered here, just get in
        touch.
      </p>

      {FAQ.map(cat => (
        <div key={cat.category} className="mt-10">
          <h3 className="text-sm font-bold tracking-wider text-neutral-500 uppercase">
            {cat.category}
          </h3>
          <div className="mt-2 border-t border-neutral-200">
            {cat.items.map(item => (
              <Accordion key={item.q} title={item.q}>
                <p>{item.a}</p>
              </Accordion>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
