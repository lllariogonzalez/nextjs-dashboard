import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;
    const [invoice, customers] : [InvoiceForm | undefined , CustomerField[] | undefined] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
      ]);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form invoice={invoice!} customers={customers} />
        </main>
    );
}