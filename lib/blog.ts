export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  badge: string;
  excerpt: string;
  image: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-breed-anubis-with-musclehead",
    title: "How to Breed Anubis with Musclehead",
    date: "May 9, 2026",
    category: "BREEDING GUIDES",
    badge: "Calculator Inside",
    excerpt: "Stop wasting cakes on random breeding. Here is the exact mathematical path to guarantee an Anubis with the Musclehead passive.",
    image: "/images/img-features-01.jpg",
    content: `
<p>We have all been there. You have spent hours baking cakes, catching random Penkings and Bushis, and you finally get an Anubis... but it has <em>Slacker</em> and <em>Glutton</em>. Staring at a botched breeding result is devastating when you know how much time it took.</p>

<p>The math to fix this is actually straightforward, even if the RNG feels punishing. To breed an Anubis with Musclehead (+30% Attack), you need to isolate the passive on your parent Pals. Do not just throw two Pals with 4 random passives each into the farm and pray.</p>

<h3>The Clean Parent Strategy</h3>
<p>To maximize your odds (roughly 40% chance), you want your two parents to have a combined passive pool of exactly ONE trait: Musclehead. Here is how:</p>
<ul>
  <li><strong>Step 1:</strong> Catch a wild Pal that naturally has Musclehead and nothing else.</li>
  <li><strong>Step 2:</strong> Use our <a href="/">Find Parents</a> tool to see how to chain that specific Pal into either a Penking or a Bushi.</li>
  <li><strong>Step 3:</strong> Breed until you get a Penking (or Bushi) with ONLY Musclehead.</li>
  <li><strong>Step 4:</strong> Breed that Penking with a Bushi that has NO passive skills (a blank slate).</li>
</ul>

<div class="p-4 bg-[var(--pw-surface)] border border-[var(--pw-border)] rounded-xl my-6">
  <strong class="text-[var(--pw-yellow)]">The Grind Truth:</strong> "Close enough" is a trap. If your Parent A has Musclehead + Nimble, and Parent B has nothing, your passive pool is 2. Your chance of passing down just Musclehead drops significantly. Always take the time to breed "clean" parents first. It saves cakes in the long run.
</div>

<p>Don't guess the math. Use the Passives Calculator on our main page to see your exact inheritance odds before you start baking.</p>
    `
  },
  {
    slug: "fastest-way-to-get-legend-passive",
    title: "Fastest Way to Get the Legend Passive on Any Pal",
    date: "May 8, 2026",
    category: "ENDGAME STRATEGY",
    badge: "Pro Tips",
    excerpt: "The Legend passive is locked behind endgame bosses. Here is how to breed it down to your favorite early-game Pals efficiently.",
    image: "/images/img-features-02.jpg",
    content: `
<p>Getting your first Legendary Pal is a rush. Realizing you now have to figure out how to pass that <em>Legend</em> trait (+20% Attack, +20% Defense, +15% Speed) down to your favorite worker or combat Pal? That is when the headache begins. Human brains are not built to reverse-engineer a 130-node breeding graph.</p>

<p>But let's look at the numbers. Passing down Legend is just a series of stepping stones. The math is simple if you use the right tool.</p>

<h3>The Tower Down-Breeding Method</h3>
<p>Legendary Pals like Frostallion, Jetragon, and Paladius have a breeding power of 10-30 (the rarest). To pass Legend to a common Pal (power ~1000), you have to breed them with other high-power (weak) Pals repeatedly to "water down" the power level.</p>

<ul>
  <li><strong>Step 1:</strong> Catch a Legendary (e.g., Frostallion). It will always have the Legend passive.</li>
  <li><strong>Step 2:</strong> Open the <a href="/">Breeding Chain</a> tab on our calculator.</li>
  <li><strong>Step 3:</strong> Set Frostallion as your starting point, and your target Pal (e.g., Direhowl) as the destination.</li>
  <li><strong>Step 4:</strong> The calculator will show you the exact 3 or 4 step path. At each step, keep breeding until the child inherits the Legend passive, then use that child for the next step.</li>
</ul>

<div class="p-4 bg-[var(--pw-surface)] border border-[var(--pw-border)] rounded-xl my-6">
  <strong class="text-[var(--pw-yellow)]">The Grind Truth:</strong> Never mix elemental emperor traits (like Ice Emperor from Frostallion) into the pool if you are passing Legend to a non-Ice Pal. It creates permanent noise. Breed Frostallion with a blank Pal until you get a child with ONLY Legend, then use that child to continue the chain.
</div>
    `
  },
  {
    slug: "jetragon-vs-frostallion-noct",
    title: "Jetragon vs Frostallion Noct: Best Flying Mount?",
    date: "May 7, 2026",
    category: "COMPARISONS",
    badge: "Stat Breakdown",
    excerpt: "Tired of debating which endgame mount is worth your time? We break down the exact speed stats and breeding effort required.",
    image: "/images/img-features-03.jpg",
    content: `
<p>You have hit the endgame. You have a base full of Anubis crafting spheres, and now you want to cross the map without falling asleep at your keyboard. You are staring at Jetragon and Frostallion Noct, wondering which one deserves the grueling 4-passive breeding process (Swift, Runner, Nimble, Legend).</p>

<p>The problem with generic tier lists is they ignore the reality of how these Pals feel to ride. Here is the undeniable logic.</p>

<h3>The Raw Speed Math</h3>
<p>Base speed is the only metric that matters here. When we apply the +75% speed multiplier from perfect passives (Legend 15% + Swift 30% + Runner 20% + Nimble 10%), the numbers look like this:</p>

<ul>
  <li><strong>Jetragon Base Sprint:</strong> 3300</li>
  <li><strong>Jetragon Perfect Sprint:</strong> 5775</li>
  <li><strong>Frostallion Noct Base Sprint:</strong> 1500</li>
  <li><strong>Frostallion Noct Perfect Sprint:</strong> 2625</li>
</ul>

<p>Jetragon is mathematically more than twice as fast. It is not even a contest.</p>

<div class="p-4 bg-[var(--pw-surface)] border border-[var(--pw-border)] rounded-xl my-6">
  <strong class="text-[var(--pw-yellow)]">The Grind Truth:</strong> Frostallion Noct requires massive breeding effort because it has to be bred from Frostallion + Helzephyr, meaning you have to manually breed the speed passives onto Helzephyr first. Jetragon can just be bred with itself. Jetragon is faster to obtain perfect passives for AND twice as fast in the air.
</div>
    `
  },
  {
    slug: "how-to-calculate-passive-probabilities",
    title: "How to Calculate Passive Inheritance Probabilities",
    date: "May 6, 2026",
    category: "MECHANICS",
    badge: "Calculator Inside",
    excerpt: "Stop guessing your odds. Learn the exact datamined formula for passing down 4 perfect passive skills in Palworld.",
    image: "/images/bg-features.jpg",
    content: `
<p>Throwing two Pals into a breeding farm and hoping for a perfect 4-passive offspring is a recipe for madness. Human brains are terrible at probability; we assume 2 good traits + 2 good traits = 4 good traits. The game's code does not care about our assumptions.</p>

<p>The math behind passive inheritance relies on a "pool" system. Understanding this pool is the only way to retain your sanity while breeding.</p>

<h3>The Inheritance Pool Explained</h3>
<p>When an egg is generated, the game looks at every UNIQUE passive skill on both parents. This is your "pool." If Parent A has Swift and Parent B has Runner, your pool size is 2. The game then randomly rolls to decide how many passives the child inherits from this pool (0 to 4).</p>

<ul>
  <li><strong>Pool Size 1:</strong> ~40% chance the child inherits it.</li>
  <li><strong>Pool Size 2:</strong> ~24% chance the child inherits both.</li>
  <li><strong>Pool Size 3:</strong> ~12% chance the child inherits all three.</li>
  <li><strong>Pool Size 4:</strong> ~10% chance the child inherits all four.</li>
</ul>

<div class="p-4 bg-[var(--pw-surface)] border border-[var(--pw-border)] rounded-xl my-6">
  <strong class="text-[var(--pw-yellow)]">The Grind Truth:</strong> A 10% chance means you will likely need to bake 10-15 cakes to see your perfect Pal. But if your parents have 5 unique passives between them (e.g., 4 good ones and 1 junk passive), your odds of getting the perfect 4 plummet to under 2%. Never breed with "noise" in the pool.
</div>

<p>To save yourself the mental math, use the Passive Odds section on our main <a href="/">Breeding Calculator</a>. Select your passives, and we will give you the exact percentage.</p>
    `
  },
  {
    slug: "best-base-workers-endgame-mining",
    title: "Best Base Workers for Endgame Mining and Farming",
    date: "May 5, 2026",
    category: "BASE BUILDING",
    badge: "Tier List",
    excerpt: "Optimizing your base doesn't require a spreadsheet. Here are the mathematically best Pals for Ore, Coal, and Farming automation.",
    image: "/images/img-intro-character-right.png",
    content: `
<p>Waking up to a base with empty chests and starving Pals is the fastest way to kill your motivation. You do not need 15 different species running around getting stuck on trees; you need absolute, optimized efficiency.</p>

<p>The problem with early-game workers is that Level 1 or 2 work suitabilities scale terribly. We need Level 3 and 4 workers equipped with Artisan and Work Slave to completely automate resource generation.</p>

<h3>The Holy Trinity of Base Workers</h3>
<p>If you want to never swing a pickaxe again, you only need to breed these three Pals with perfect work passives (Artisan, Work Slave, Serious, Lucky):</p>

<ul>
  <li><strong>Astegon (Mining Lv. 4):</strong> With perfect passives, Astegon will clear an entire Ore node in seconds. Unlike Digtoise, Astegon does not require a headband to be effective while assigned to the base.</li>
  <li><strong>Jormuntide Ignis (Kindling Lv. 4):</strong> Baking cakes takes forever. Jormuntide Ignis cuts baking time down to a fraction, allowing you to sustain massive breeding operations.</li>
  <li><strong>Lyleen (Planting Lv. 4):</strong> Pair her with a Jormuntide (Watering Lv. 4) and your lettuce and tomato plantations will yield thousands of crops per hour.</li>
</ul>

<div class="p-4 bg-[var(--pw-surface)] border border-[var(--pw-border)] rounded-xl my-6">
  <strong class="text-[var(--pw-yellow)]">The Grind Truth:</strong> Big Pals get stuck. It is a reality of the game's pathfinding. Even if Astegon has the best stats, if your base is cramped, he will starve on a roof. Build your mining bases completely flat, remove all defensive walls, and keep the feed box touching the Palbox.
</div>
    `
  }
];
