import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Logo } from "@/client/components/logo";

import { ProductHuntBanner } from "./product-hunt-banner";

export const Header = () => (
  <motion.header
    className="fixed inset-x-0 top-0 z-20"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.3 } }}
  >
    <ProductHuntBanner />

    <div className="py-3 bg-gradient-to-b from-background to-transparent">
      <div>
        <Link to="/">
          <Logo size={96} />
        </Link>

        <div />
      </div>
    </div>
  </motion.header>
);
