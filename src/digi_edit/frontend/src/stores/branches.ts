import { writable, derived, get } from 'svelte/store';

import { getAll } from './jsonapi';
import { authToken } from './auth';

export const branches = writable([]);
export const branchesBusy = writable(false);

export const activeBranches = derived(branches, (branches) => {
    return branches.filter((branch) => {
        return branch.attributes.status === 'active';
    });
});

export async function getAllBranches() {
    try {
        branchesBusy.set(true);
        branches.set(await getAll('branches', ''));
    } finally {
        branchesBusy.set(false);
    }
}

export const busyBranchAction = writable('');

export async function createBranch(branch) {
    try {
        busyBranchAction.set('create');
        const url = '/api/branches';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Authorization': get(authToken),
            },
            body: JSON.stringify({'data': branch}),
        });
        if (response.status === 200) {
            branches.set(await getAll('branches', ''));
            return (await response.json()).data;
        } else {
            throw new Error(JSON.stringify(await response.json()));
        }
    } catch (e) {
        throw e;
    } finally {
        busyBranchAction.set('');
    }
}

export async function postBranchAction(branch, action: string) {
    try {
        busyBranchAction.set(action);
        const url = '/api/branches/' + branch.id;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Authorization': get(authToken),
                'X-Action': action,
            }
        });
        branches.set(await getAll('branches', ''));
    } finally {
        busyBranchAction.set('');
    }
}

export async function deleteBranch(branch) {
    try {
        busyBranchAction.set('delete');
        const url = '/api/branches/' + branch.id;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'X-Authorization': get(authToken),
            }
        });
        await getAllBranches();
    } catch {
        busyBranchAction.set('');
    }
}
