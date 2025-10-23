import { createClient } from '@supabase/supabase-js';
import { products } from './src/data/products';

const supabaseUrl = 'https://poothbswofsqcmzuafgv.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function migrateProducts() {
  console.log('Starting product migration...');

  for (const product of products) {
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: product.title,
          category: product.description.substring(0, 50),
          price: 0,
          show_price: false,
          image: product.imageUrl
        }]);

      if (error) {
        console.error(`Error migrating product ${product.title}:`, error);
      } else {
        console.log(`Successfully migrated: ${product.title}`);
      }
    } catch (error) {
      console.error(`Error migrating product ${product.title}:`, error);
    }
  }

  console.log('Migration complete!');
}

migrateProducts();
