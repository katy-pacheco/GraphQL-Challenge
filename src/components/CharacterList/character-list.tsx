import { useQuery } from '@apollo/client';
import { GET_CHARACTER_LIST } from './get-character-list.graphql';
import type { Character } from '../../interface/character.interface';
import { useScrollListener } from '../../hooks/use-scroll-listener';
import styles from '../CharacterList/character.module.css';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import Loading from '../../assets/loading.svg';

export default function CharacterList() {
    const { data, loading, error, fetchMore } = useQuery(GET_CHARACTER_LIST, {
        variables: { page: 1 },
        notifyOnNetworkStatusChange: true,
    });

    useScrollListener(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            !loading &&
            data?.characters?.info?.next
        ) {
            fetchMore({
                variables: { page: data.characters.info.next },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prevResult;

                    return {
                        characters: {
                            ...fetchMoreResult.characters,
                            results: [
                                ...prevResult.characters.results,
                                ...fetchMoreResult.characters.results,
                            ],
                        },
                    };
                },
            });
        }
    });

    return (
        <div className={styles.sidebar}>
            {data?.characters?.results.map((character: Character) => (
                <div key={character.id} className={styles.sidebarContent}>
                    <div className={styles.textGroup}>
                        <h2 className={styles.title}>{character.name}</h2>
                        <p className={styles.subtitle}>{character.species}</p>
                    </div>
                    <ChevronRightIcon className={styles.ChevronRightIcon} />
                </div>
            ))}

            {error &&
                <h2 className={styles.errorMessage}>Failed to Load Data</h2>
            }

            {loading &&
                <div className={styles.loadingIcon}> <img src={Loading} alt="loading characters" /><p>Loading</p></div>
            }
        </div>
    );
}


